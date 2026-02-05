init:
    pnpm install

dev:
    uv run jupyter lite serve

build-jupyterlite:
    uv run jupyter lite build

build-gas:
    pnpm exec vite build

build: build-jupyterlite build-gas

# forward args to clasp eg `just clasp push`
clasp +ARGS:
    pnpm exec clasp {{ARGS}}

push:
    just clasp push