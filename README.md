SEMVERILY
=========

overly helpful semver version bumper


INSTALL:
----------
```bash
sudo npm install semverily -g
```

HOW TO USE:
----------
* bump build on prerelease (sorry you can't name prereleases: '1.2.3', 'major', 'minor', 'patch', or '-h')
    ```bash
        semverily alpha
        semverily rc2
        semverily my-special-name

    ```

* bump part of the version
    ```bash
        semverily major
        semverily minor
        semverily patch

    ```

* start development on a new version
    ```bash
        semverily 1.2.3-alpha

    ```

* publish specific version
    ```bash
        semverily 1.2.3

    ```

* force publish specific version
    ```bash
        semverily 1.2.3 --force

    ```
