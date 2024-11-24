use super::*;

#[test]
fn allow_missing_recipes_in_run_invocation() {
  Test::new()
    .arg("foo")
    .stderr("error: Justfile does not contain recipe `foo`\n")
    .status(EXIT_FAILURE)
    .run();

  Test::new().args(["--allow-missing", "foo"]).run();
}

#[test]
fn allow_missing_modules_in_run_invocation() {
  Test::new()
    .arg("foo::bar")
    .stderr("error: Justfile does not contain submodule `foo`\n")
    .status(EXIT_FAILURE)
    .run();

  Test::new().args(["--allow-missing", "foo::bar"]).run();
}

#[test]
fn allow_missing_does_not_apply_to_compilation_errors() {
  Test::new()
    .justfile("bar: foo")
    .args(["--allow-missing", "foo"])
    .stderr(
      "
        error: Recipe `bar` has unknown dependency `foo`
         ——▶ justfile:1:6
          │
        1 │ bar: foo
          │      ^^^
      ",
    )
    .status(EXIT_FAILURE)
    .run();
}

#[test]
fn allow_missing_does_not_apply_to_other_subcommands() {
  Test::new()
    .args(["--allow-missing", "--show", "foo"])
    .stderr("error: Justfile does not contain recipe `foo`\n")
    .status(EXIT_FAILURE)
    .run();
}
