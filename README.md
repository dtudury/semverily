VERILY
=========

overly helpful semver version bumper


INSTALL:
----------
```bash
sudo npm install verily -g
```

HOW TO USE:
----------
* bump build on prerelease (sorry you can't name prereleases: '1.2.3', 'major', 'minor', 'patch', or '-h')
    ```bash
        verily alpha
        verily rc2
        verily my-special-name

    ```

* bump part of the version
    ```bash
        verily major
        verily minor
        verily patch

    ```

* start development on a new version
    ```bash
        verily 1.2.3-alpha

    ```

* publish specific version
    ```bash
        verily 1.2.3

    ```

* force publish specific version
    ```bash
        verily 1.2.3 --force

    ```
