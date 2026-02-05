init:
    pnpm install

clean-jl:
    rm -rf jl/lite

build-jl: clean-jl
    cd jl && uv run jupyter lite build --contents ../README.md --contents ./starter.ipynb --lite-dir ./config --output-dir ./build/lite

dev-jl:
    cd jl && uv run jupyter lite serve

dev-gas: build-jl
    cd gas && rm -rf ./public/ && mkdir -p ./public && cp -r ../jl/build/lite ./public/lite && VITE_DEMO_SRC='./lite/index.html' pnpm exec vite dev

build-gas jlsrc="https://jupyterlite.readthedocs.io/en/latest/_static/notebooks/index.html?path=intro.ipynb":
    cd gas && VITE_DEMO_SRC={{jlsrc}} pnpm exec vite build

dev:
    just dev-jl & just dev-gas

build: build-jl build-gas

# forward args to clasp eg `just clasp push`
clasp +ARGS:
    pnpm exec clasp {{ARGS}}

push:
    just clasp push