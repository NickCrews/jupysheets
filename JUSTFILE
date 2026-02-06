init:
    pnpm install

clean-jl:
    rm -rf jl/lite

build-jl: clean-jl
    cd jl && uv run --all-groups jupyter lite build --contents ../README.md --contents ./starter.ipynb --lite-dir ./config --output-dir ./build/lite --apps notebooks --no-unused-shared-packages

dev-jl:
    cd jl && uv run --all-groups jupyter lite serve --help

# copy the built jl lite to gas public dir so it can be served by vite
mv-jl-to-gas: build-jl
    rm -rf gas/public/lite && mkdir -p gas/public && cp -r jl/build/lite gas/public/lite

dev-gas mode="dev": mv-jl-to-gas
    cd gas && VITE_DEMO_SRC='./lite/notebooks/index.html?path=starter.ipynb' pnpm exec vite {{mode}}

build-gas jlsrc="https://jupyterlite.readthedocs.io/en/latest/_static/notebooks/index.html?path=starter.ipynb":
    cd gas && VITE_DEMO_SRC={{jlsrc}} pnpm exec vite build

dev:
    just dev-jl & just dev-gas

build: build-jl build-gas

# forward args to clasp eg `just clasp push`
clasp +ARGS:
    pnpm exec clasp {{ARGS}}

push:
    just clasp push