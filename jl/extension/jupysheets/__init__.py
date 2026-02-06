try:
    from ._version import __version__
except ImportError:
    # Fallback when using the package in dev mode without installing
    # in editable mode with pip. It is highly recommended to install
    # the package from a stable release or in editable mode: https://pip.pypa.io/en/stable/topics/local-project-installs/#editable-installs
    import warnings

    warnings.warn("Importing 'jupysheets' outside a proper installation.")
    __version__ = "dev"


def _jupyter_labextension_paths():
    return [{"src": "labextension", "dest": "jupysheets"}]


def read_range(range_str: str):
    """Read a range of cells from the spreadsheet and return it as a list of lists."""
    return [[1, 2, 3], [4, 5, 6]]
