"""Cartoon miniature dioramas for the social cards, one per route.

    blender -b --factory-startup -P scripts/og/scenes.py -- [scene ...]

Renders transparent PNGs to scripts/og/renders/<scene>.png; then run
`node scripts/build-og-cards.mjs` to place them on the cards. The look follows
the site's Cartoon style (rounded miniatures on a paper plinth, as on /contact).
"""

import math
import os
import sys

import bmesh
import bpy
from mathutils import Euler, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "renders")

# Site palette, sRGB hex.
PALETTE = {
    "paper": "#FBF8F2",
    "plinth": "#EDE6DA",
    "sage": "#CADBC8",
    "sage_dark": "#8FB59A",
    "terracotta": "#EE9A78",
    "terracotta_dark": "#C9694A",
    "cobalt": "#2F5BB5",
    "cobalt_light": "#9AB6FF",
    "ink": "#29231F",
    "wood": "#A0724C",
    "screen": "#1F2A3A",
    "up": "#5DAA7E",
    "down": "#E0664F",
    "cream": "#F6E7C8",
    "tennis": "#D6E25C",
    "steel": "#7C8594",
    "white": "#FFFFFF",
}


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def rgba(hex_):
    h = hex_.lstrip("#")
    return tuple(srgb_to_linear(int(h[i : i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)


_mats = {}


def mat(name, rough=0.55, emit=0.0):
    key = (name, rough, emit)
    if key in _mats:
        return _mats[key]
    m = bpy.data.materials.new(f"{name}-{rough}-{emit}")
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = rgba(PALETTE[name])
    bsdf.inputs["Roughness"].default_value = rough
    if emit:
        bsdf.inputs["Emission Color"].default_value = rgba(PALETTE[name])
        bsdf.inputs["Emission Strength"].default_value = emit
    _mats[key] = m
    return m


def link(obj):
    bpy.context.scene.collection.objects.link(obj)
    return obj


def smooth(obj):
    for p in obj.data.polygons:
        p.use_smooth = True


def place(obj, loc, rot, material):
    obj.location = loc
    obj.rotation_euler = Euler([math.radians(a) for a in rot])
    obj.data.materials.append(material)
    return obj


def rbox(size, loc=(0, 0, 0), rot=(0, 0, 0), m="paper", bevel=0.08, rough=0.55, emit=0.0):
    """Rounded box. `size` is full extents; `loc` is the centre."""
    me = bpy.data.meshes.new("box")
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    bm.to_mesh(me)
    bm.free()
    obj = link(bpy.data.objects.new("box", me))
    b = min(bevel, min(size) * 0.49)
    if b > 0:
        mod = obj.modifiers.new("bevel", "BEVEL")
        mod.width = b
        mod.segments = 5
        mod.limit_method = "NONE"
    smooth(obj)
    return place(obj, loc, rot, mat(m, rough, emit))


def cyl(r, h, loc=(0, 0, 0), rot=(0, 0, 0), m="paper", bevel=0.03, verts=48, rough=0.55):
    me = bpy.data.meshes.new("cyl")
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r, depth=h)
    bm.to_mesh(me)
    bm.free()
    obj = link(bpy.data.objects.new("cyl", me))
    if bevel:
        mod = obj.modifiers.new("bevel", "BEVEL")
        mod.width = min(bevel, r * 0.4, h * 0.4)
        mod.segments = 4
        mod.limit_method = "ANGLE"
    smooth(obj)
    return place(obj, loc, rot, mat(m, rough))


def cone(r1, r2, h, loc=(0, 0, 0), rot=(0, 0, 0), m="paper", verts=48):
    me = bpy.data.meshes.new("cone")
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r1, radius2=r2, depth=h)
    bm.to_mesh(me)
    bm.free()
    obj = link(bpy.data.objects.new("cone", me))
    smooth(obj)
    return place(obj, loc, rot, mat(m))


def sphere(r, loc=(0, 0, 0), m="paper", scale=(1, 1, 1), rough=0.5):
    me = bpy.data.meshes.new("sphere")
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=48, v_segments=24, radius=r)
    bm.to_mesh(me)
    bm.free()
    obj = link(bpy.data.objects.new("sphere", me))
    obj.scale = scale
    smooth(obj)
    return place(obj, loc, (0, 0, 0), mat(m, rough))


def arc(radius, thick, start, end, loc, rot, m="ink", segs=24):
    """A tube bent along a circular arc in the local XZ plane (smiles, handles)."""
    curve = bpy.data.curves.new("arc", "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = thick
    curve.bevel_resolution = 4
    curve.use_fill_caps = True
    spline = curve.splines.new("POLY")
    spline.points.add(segs)
    for i in range(segs + 1):
        t = math.radians(start + (end - start) * i / segs)
        spline.points[i].co = (radius * math.cos(t), 0, radius * math.sin(t), 1)
    obj = link(bpy.data.objects.new("arc", curve))
    obj.location = loc
    obj.rotation_euler = Euler([math.radians(a) for a in rot])
    obj.data.materials.append(mat(m, 0.4))
    return obj


def face(loc, rot, scale=1.0, m="ink"):
    """Two dot eyes and a smile on a plane facing local -Y."""
    x, y, z = loc
    s = scale
    parent = link(bpy.data.objects.new("face", None))
    parent.location = loc
    parent.rotation_euler = Euler([math.radians(a) for a in rot])
    for dx in (-0.16 * s, 0.16 * s):
        e = sphere(0.045 * s, (dx, 0, 0.05 * s), m, scale=(1, 0.5, 1))
        e.parent = parent
    smile = arc(0.1 * s, 0.018 * s, 200, 340, (0, 0, 0.02 * s), (0, 0, 0), "terracotta_dark")
    smile.parent = parent
    return parent


def check(loc, rot, size=1.0, m="cobalt"):
    """A chunky check mark standing up in the local XZ plane."""
    parent = link(bpy.data.objects.new("check", None))
    parent.location = loc
    parent.rotation_euler = Euler([math.radians(a) for a in rot])
    a = rbox((0.14 * size, 0.1 * size, 0.34 * size), (-0.1 * size, 0, 0.0), (0, -40, 0), m, 0.04)
    b = rbox((0.14 * size, 0.1 * size, 0.62 * size), (0.12 * size, 0, 0.1 * size), (0, 35, 0), m, 0.04)
    a.parent = parent
    b.parent = parent
    return parent


def plinth(w=3.4, d=3.4, grass=True):
    rbox((w, d, 0.34), (0, 0, -0.17), m="paper", bevel=0.14)
    if grass:
        rbox((w - 0.36, d - 0.36, 0.08), (0, 0, 0.02), m="sage", bevel=0.04)


def tree(x, y, h=0.9, s=1.0):
    cyl(0.05 * s, h * 0.6, (x, y, h * 0.3), m="wood", bevel=0.01)
    sphere(0.26 * s, (x, y, h * 0.72), "sage_dark", scale=(1, 1, 1.25))


def candles(x0, z0, y, w, heights, rot=(0, 0, 0)):
    """Candlestick bars on a screen plane at depth y, rising from z0."""
    step = w / len(heights)
    for i, (lo, hi, up) in enumerate(heights):
        cx = x0 + step * (i + 0.5)
        rbox((step * 0.5, 0.03, hi - lo), (cx, y, z0 + (lo + hi) / 2), rot, "up" if up else "down", 0.012, emit=0.6)
        rbox((0.014, 0.02, (hi - lo) * 1.5), (cx, y + 0.005, z0 + (lo + hi) / 2), rot, "up" if up else "down", 0.0, emit=0.6)


# --------------------------------------------------------------------------- scenes


def scene_home():
    plinth(3.6, 3.2)
    # Laptop with a friendly agent on screen.
    rbox((1.7, 1.15, 0.08), (0.1, 0.1, 0.1), m="paper", bevel=0.04)
    rbox((1.5, 0.75, 0.02), (0.1, -0.02, 0.15), m="plinth", bevel=0.01)
    lid = rbox((1.7, 0.07, 1.1), (0.1, 0.66, 0.66), (-12, 0, 0), "paper", 0.04)
    rbox((1.5, 0.02, 0.9), (0.1, 0.62, 0.67), (-12, 0, 0), "screen", 0.03, rough=0.3)
    face((0.1, 0.58, 0.72), (-12, 0, 0), 1.9, "cobalt_light")
    # Speech bubble: the agent is talking.
    rbox((0.8, 0.22, 0.46), (1.25, 0.55, 1.75), (0, 0, -10), "terracotta", 0.18)
    cone(0.09, 0.0, 0.26, (1.02, 0.55, 1.46), (0, 150, -10), "terracotta")
    for i in range(3):
        sphere(0.05, (1.07 + i * 0.18, 0.43, 1.75), "paper")
    # Mug, tennis ball, a tiny chart card, a tree.
    cyl(0.2, 0.34, (-1.15, -0.55, 0.23), m="terracotta", bevel=0.03)
    arc(0.1, 0.03, -80, 80, (-0.95, -0.55, 0.24), (0, 0, 0), "terracotta")
    sphere(0.17, (1.15, -0.75, 0.23), "tennis", rough=0.9)
    arc(0.172, 0.014, 0, 360, (1.15, -0.75, 0.23), (0, 60, 30), "white", 40)
    tree(-1.25, 0.95, 1.0)
    tree(1.35, 1.05, 0.8, 0.8)


def scene_groundplane():
    plinth(3.4, 3.2)
    # A clipboard of recorded facts, a check, and a magnifier on the answer.
    rbox((1.3, 0.12, 1.7), (-0.35, 0.3, 0.93), (-8, 0, 0), "wood", 0.06)
    rbox((1.1, 0.04, 1.4), (-0.35, 0.22, 0.88), (-8, 0, 0), "paper", 0.02)
    rbox((0.5, 0.08, 0.14), (-0.35, 0.24, 1.72), (-8, 0, 0), "steel", 0.03)
    for i, w in enumerate((0.7, 0.5, 0.62, 0.42)):
        rbox((w, 0.02, 0.07), (-0.55 + w / 2 - 0.1, 0.17, 1.4 - i * 0.24), (-8, 0, 0), "cobalt_light" if i else "cobalt", 0.02)
    check((-0.28, 0.12, 0.42), (-8, 0, 0), 0.8, "up")
    # A "verified" seal standing beside the facts.
    cyl(0.5, 0.14, (0.95, -0.35, 0.62), (90, 0, 0), "terracotta", 0.05)
    check((0.95, -0.44, 0.6), (0, 0, 0), 0.75, "paper")
    cyl(0.12, 0.14, (0.95, -0.35, 0.07), (0, 0, 0), "terracotta_dark", 0.03)
    tree(1.3, 1.05, 0.9)


def scene_compoze():
    plinth(3.4, 3.2)
    # A stack of documents and a speech bubble that answers from them.
    for i, (dx, rz) in enumerate(((0, 4), (0.05, -6), (-0.04, 9), (0.02, -2))):
        rbox((1.1, 1.4, 0.07), (-0.6 + dx, -0.1, 0.12 + i * 0.08), (0, 0, rz), "paper" if i % 2 == 0 else "cream", 0.02)
    for i, w in enumerate((0.7, 0.55, 0.62)):
        rbox((w, 0.07, 0.02), (-0.66 + w / 2 - 0.3, 0.1 - i * 0.22, 0.44), (0, 0, -2), "cobalt_light", 0.01)
    # Bubble.
    rbox((1.4, 0.3, 0.95), (0.6, 0.6, 1.35), (0, 0, -10), "terracotta", 0.28)
    cone(0.18, 0.0, 0.4, (0.25, 0.55, 0.78), (0, 150, -10), "terracotta")
    for i, w in enumerate((0.9, 0.6)):
        rbox((w, 0.06, 0.1), (0.6 - (0.9 - w) / 2, 0.44, 1.5 - i * 0.26), (0, 0, -10), "paper", 0.04)
    tree(1.3, -0.95, 0.8, 0.85)
    tree(-1.35, 1.05, 1.0)


def scene_trading_engine():
    plinth(3.6, 3.0)
    # Monitor with a candlestick chart; a small stand and keyboard.
    rbox((2.4, 0.16, 1.5), (0, 0.45, 1.25), (0, 0, 0), "paper", 0.08)
    rbox((2.2, 0.04, 1.3), (0, 0.36, 1.25), (0, 0, 0), "screen", 0.04, rough=0.3)
    candles(-1.0, 0.72, 0.33, 2.0, [(0.2, 0.45, True), (0.35, 0.6, True), (0.3, 0.5, False), (0.4, 0.7, True), (0.5, 0.65, False), (0.45, 0.85, True), (0.6, 0.95, True)])
    rbox((0.2, 0.2, 0.5), (0, 0.55, 0.27), m="paper", bevel=0.05)
    rbox((0.8, 0.5, 0.06), (0, 0.55, 0.06), m="paper", bevel=0.03)
    rbox((1.4, 0.5, 0.08), (-0.2, -0.65, 0.08), (0, 0, 4), "paper", 0.04)
    for r in range(2):
        for c in range(8):
            rbox((0.12, 0.12, 0.04), (-0.8 + c * 0.16, -0.72 + r * 0.16, 0.14), (0, 0, 4), "plinth", 0.02)
    cyl(0.18, 0.32, (1.2, -0.75, 0.22), m="terracotta", bevel=0.03)
    arc(0.09, 0.028, -80, 80, (1.38, -0.75, 0.23), (0, 0, 0), "terracotta")
    tree(-1.45, -0.9, 0.8, 0.8)


def scene_skillsmith():
    plinth(3.4, 3.2)
    # Anvil with a glowing skill scroll, and a hammer.
    rbox((0.7, 0.5, 0.45), (-0.2, 0, 0.3), m="steel", bevel=0.05, rough=0.35)
    rbox((1.5, 0.62, 0.3), (-0.2, 0, 0.66), m="steel", bevel=0.06, rough=0.35)
    cone(0.3, 0.04, 0.45, (0.72, 0, 0.66), (0, 90, 0), "steel")
    cyl(0.14, 0.9, (-0.3, -0.05, 0.95), (0, 90, 8), "cream", 0.03)
    rbox((0.8, 0.03, 0.3), (-0.3, -0.08, 0.85), (70, 0, 8), "cream", 0.02)
    check((-0.3, -0.35, 1.45), (0, 0, 0), 0.7, "up")
    # Hammer.
    cyl(0.05, 1.1, (0.7, -0.9, 0.12), (0, 90, 30), "wood", 0.02)
    rbox((0.22, 0.45, 0.22), (1.15, -0.65, 0.18), (0, 0, 30), "terracotta", 0.05)
    tree(1.35, 1.05, 0.8, 0.8)
    tree(-1.35, -1.0, 0.7, 0.75)


def scene_skillpack():
    plinth(3.4, 3.2)
    # A backpack with scrolls poking out.
    rbox((1.3, 0.8, 1.5), (-0.1, 0.1, 0.8), (0, 0, -8), "terracotta", 0.32)
    rbox((1.32, 0.5, 0.55), (-0.1, -0.2, 1.35), (-20, 0, -8), "terracotta_dark", 0.2)
    rbox((0.9, 0.2, 0.55), (-0.15, -0.36, 0.5), (0, 0, -8), "terracotta_dark", 0.14)
    cyl(0.08, 0.1, (-0.1, -0.45, 1.05), (90, 0, -8), "cream", 0.02)
    for i, (dx, c) in enumerate(((-0.4, "cream"), (-0.1, "cobalt_light"), (0.2, "sage_dark"))):
        cyl(0.1, 0.7, (dx, 0.3, 1.75 + i * 0.05), (0, 12 - i * 10, -8), c, 0.03)
    tree(1.2, 0.95, 1.0)
    sphere(0.16, (1.1, -0.85, 0.2), "tennis", rough=0.9)


def scene_jobforge():
    plinth(3.4, 3.2)
    # A whiteboard on an easel with a plan sketched on it, and a speech bubble.
    for dx in (-0.7, 0.7):
        cyl(0.04, 1.75, (dx, 0.52, 0.88), (8, 0, 0), "wood", 0.01)
    rbox((1.9, 0.08, 1.25), (0, 0.42, 1.3), (-8, 0, 0), "white", 0.04)
    rbox((2.0, 0.1, 0.06), (0, 0.4, 0.66), (-8, 0, 0), "wood", 0.02)
    for (x, z, c) in ((-0.55, 1.6, "cobalt"), (0.0, 1.2, "terracotta"), (0.55, 1.6, "cobalt")):
        rbox((0.4, 0.04, 0.24), (x, 0.36, z), (-8, 0, 0), c, 0.05)
    rbox((0.5, 0.03, 0.04), (-0.28, 0.35, 1.4), (-8, 40, 0), "ink", 0.01)
    rbox((0.5, 0.03, 0.04), (0.28, 0.35, 1.4), (-8, -40, 0), "ink", 0.01)
    rbox((0.9, 0.24, 0.5), (1.0, -0.6, 0.85), (0, 0, -15), "cobalt_light", 0.2)
    cone(0.1, 0.0, 0.3, (0.8, -0.6, 0.52), (0, 150, -15), "cobalt_light")
    for i in range(3):
        sphere(0.05, (0.8 + i * 0.2, -0.73, 0.85), "cobalt")
    tree(-1.3, -0.95, 0.8, 0.85)


def scene_uipack():
    plinth(3.4, 3.2)
    # Stacked interface panels and a colour swatch fan.
    for i, (c, rz) in enumerate((("paper", -6), ("cream", 4), ("white", -2))):
        z = 0.3 + i * 0.42
        rbox((1.6, 1.1, 0.08), (-0.35, 0.2, z), (0, 0, rz), c, 0.04)
        rbox((0.5, 0.35, 0.03), (-0.75, 0.35, z + 0.05), (0, 0, rz), "cobalt" if i == 2 else "sage_dark", 0.02)
        rbox((0.6, 0.08, 0.03), (-0.05, 0.45, z + 0.05), (0, 0, rz), "terracotta", 0.02)
        rbox((0.6, 0.08, 0.03), (-0.05, 0.25, z + 0.05), (0, 0, rz), "cobalt_light", 0.02)
    for i, c in enumerate(("cobalt", "terracotta", "sage_dark", "cream", "ink")):
        rbox((0.22, 0.9, 0.03), (1.05, -0.55, 0.12 + i * 0.035), (0, 0, -40 + i * 16), c, 0.03)
    tree(1.3, 1.05, 0.9)


SCENES = {
    "home": scene_home,
    "groundplane": scene_groundplane,
    "compoze": scene_compoze,
    "trading-engine": scene_trading_engine,
    "skillsmith": scene_skillsmith,
    "skillpack": scene_skillpack,
    "jobforge": scene_jobforge,
    "uipack": scene_uipack,
}


# --------------------------------------------------------------------------- render


def reset():
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.curves, bpy.data.lights, bpy.data.cameras):
        for block in list(coll):
            if block.users == 0:
                coll.remove(block)


def setup(scene):
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.samples = 96
    sc.cycles.use_denoising = True
    sc.render.film_transparent = True
    sc.render.resolution_x = 1100
    sc.render.resolution_y = 1100
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"

    world = sc.world or bpy.data.worlds.new("World")
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = rgba("#FFF6EA")
    bg.inputs["Strength"].default_value = 0.55

    sun = link(bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN")))
    sun.data.energy = 2.4
    sun.data.angle = math.radians(12)
    sun.rotation_euler = Euler((math.radians(40), math.radians(10), math.radians(35)))
    fill = link(bpy.data.objects.new("fill", bpy.data.lights.new("fill", "AREA")))
    fill.data.energy = 120
    fill.data.size = 6
    fill.location = (-5, -4, 4)
    fill.rotation_euler = Euler((math.radians(55), 0, math.radians(-50)))

    cam = link(bpy.data.objects.new("cam", bpy.data.cameras.new("cam")))
    cam.data.type = "ORTHO"
    cam.data.ortho_scale = 4.7
    cam.rotation_euler = Euler((math.radians(58), 0, math.radians(38)))
    direction = cam.rotation_euler.to_matrix() @ Vector((0, 0, 1))
    cam.location = Vector((0, 0, 0.3)) + direction * 20
    sc.camera = cam


def main():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    names = argv or list(SCENES)
    os.makedirs(OUT, exist_ok=True)
    print("Blender", bpy.app.version_string)
    for name in names:
        reset()
        _mats.clear()
        setup(bpy.context.scene)
        SCENES[name]()
        bpy.context.scene.render.filepath = os.path.join(OUT, f"{name}.png")
        bpy.ops.render.render(write_still=True)
        print("rendered", name, len(bpy.data.objects), "objects")


main()
