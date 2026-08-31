# Public resume

`Ong-Jun-Xiong-Resume.tex` is the reproducible source for the recruiter-safe PDF linked from
`/resume`. It intentionally omits the phone number and private/internal business metrics.

Build from the repository root:

```sh
resume_build_dir=$(mktemp -d)
xelatex -interaction=nonstopmode -halt-on-error \
  -output-directory="$resume_build_dir" \
  components/Resume/Ong-Jun-Xiong-Resume.tex
mkdir -p public/resume
cp "$resume_build_dir/Ong-Jun-Xiong-Resume.pdf" public/resume/Ong-Jun-Xiong-Resume.pdf
```

Then verify it is one page with `pdfinfo` and render it with `pdftoppm` for visual review.
