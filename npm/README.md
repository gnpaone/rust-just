<div align=right>Table of Contents↗️</div>

<h1 align=center><code>rust-just</code></h1>

<div align=center>
  <a href=https://github.com/gnpaone/rust-just>
    <img src=https://img.shields.io/badge/github-rust--just-silver?style=for-the-badge&logo=github&labelColor=black
 alt="github repo">
  </a>
  <a href=https://www.npmjs.com/package/rust-just>
    <img src=https://img.shields.io/npm/dm/rust-just?style=for-the-badge&color=orchid alt="npm downloads">
  </a>
  <a href=https://github.com/gnpaone/rust-just/blob/master/LICENSE>
    <img src=https://img.shields.io/npm/l/rust-just?style=for-the-badge alt="license">
  </a>
  <a href=https://www.npmjs.com/package/rust-just>
    <img src=https://img.shields.io/npm/v/rust-just?style=for-the-badge&labelColor=firebrick&color=tan&logo=npm
 alt="npm version">
  </a>
</div>
<br>

`rust-just` is a handy way to save and run project-specific commands.

Commands, called recipes, are stored in a file called `justfile` with syntax
inspired by `make`

## Getting Started

### Run instantly without installation

You can use `rust-just` without installing it on your system using <a href="https://www.npmjs.com/package/npx">`npx`</a>:

```
~/$ npx rust-just@latest [OPTIONS] [ARGUMENTS]...
```

It will run the most recent version of `rust-just`.

### Installation as global dependency

The recommended way to install `rust-just` is as a global dependency:

```
~/$ npm install -g rust-just
```

and then run with:

```
~/$ just [OPTIONS] [ARGUMENTS]...
```

### Installation as local dependency

`rust-just` could also be installed as a local dependency:

```
~/$ npm install rust-just
```

> **Note:** To pass Execa options to `just`, use the `--execaoptions <OPTIONS>` flag, where `OPTIONS` is in JSON format.
>
> For example:
> 
> ```
> ~/$ just --execaoptions '{"stdio": "inherit", "reject": false}' [OPTIONS] [ARGUMENTS]...
> ```
> 
> For a complete list of available Execa options, refer to the [Execa API documentation](https://github.com/sindresorhus/execa/blob/main/docs/api.md#options-1).

To read more visit: https://just.systems/man/en/

## Author & Maintainer

- [@gnpaone](https://www.github.com/gnpaone)

## Documentation

The documentation is available as a [book](https://just.systems/man/en/).

<sub>
  <hr>
  <strong>Disclaimer:</strong>
  The <a href="https://www.npmjs.com/package/rust-just"><code>rust-just</code> npm package</a> is maintained by <a href="https://www.github.com/gnpaone">@gnpaone</a> with permission from the original <code>just</code> developer. This package is not officially maintained by <a href="https://github.com/casey"><code>just</code>’s creator</a> but uses up-to-date, official binaries from the <a href="https://github.com/casey/just">casey/just</a> repository at the time of release to ensure compatibility and authenticity.
</sub>
