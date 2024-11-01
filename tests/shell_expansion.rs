use super::*;

#[test]
fn strings_are_shell_expanded() {
  Test::new()
    .justfile(
      "
        x := x'$JUST_TEST_VARIABLE'
      ",
    )
    .env("JUST_TEST_VARIABLE", "FOO")
    .args(["--evaluate", "x"])
    .stdout("FOO")
    .run();
}

#[test]
fn shell_expanded_strings_must_not_have_whitespace() {
  Test::new()
    .justfile(
      "
        x := x '$JUST_TEST_VARIABLE'
      ",
    )
    .status(1)
    .stderr(
      "
        error: Expected '&&', '||', comment, end of file, end of line, '(', '+', or '/', but found string
         ——▶ justfile:1:8
          │
        1 │ x := x '$JUST_TEST_VARIABLE'
          │        ^^^^^^^^^^^^^^^^^^^^^
      ",
    )
    .run();
}

#[test]
fn shell_expanded_error_messages_highlight_string_token() {
  Test::new()
    .justfile(
      "
        x := x'$FOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
      ",
    )
    .env("JUST_TEST_VARIABLE", "FOO")
    .args(["--evaluate", "x"])
    .status(1)
    .stderr(
    "
      error: Shell expansion failed: error looking key 'FOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' up: environment variable not found
       ——▶ justfile:1:7
        │
      1 │ x := x'$FOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
        │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      ")
    .run();
}

#[test]
fn shell_expanded_strings_are_dumped_correctly() {
  Test::new()
    .justfile(
      "
        x := x'$JUST_TEST_VARIABLE'
      ",
    )
    .env("JUST_TEST_VARIABLE", "FOO")
    .args(["--dump"])
    .stdout("x := x'$JUST_TEST_VARIABLE'\n")
    .run();
}

#[test]
fn shell_expanded_strings_can_be_used_in_settings() {
  Test::new()
    .justfile(
      "
        set dotenv-filename := x'$JUST_TEST_VARIABLE'

        @foo:
          echo $DOTENV_KEY
      ",
    )
    .write(".env", "DOTENV_KEY=dotenv-value")
    .env("JUST_TEST_VARIABLE", ".env")
    .stdout("dotenv-value\n")
    .run();
}

#[test]
fn shell_expanded_strings_can_be_used_in_import_paths() {
  Test::new()
    .justfile(
      "
        import x'$JUST_TEST_VARIABLE'

        foo: bar
      ",
    )
    .write("import.just", "@bar:\n echo BAR")
    .env("JUST_TEST_VARIABLE", "import.just")
    .stdout("BAR\n")
    .run();
}

#[test]
fn shell_expanded_strings_can_be_used_in_mod_paths() {
  Test::new()
    .justfile(
      "
        mod foo x'$JUST_TEST_VARIABLE'
      ",
    )
    .write("mod.just", "@bar:\n echo BAR")
    .env("JUST_TEST_VARIABLE", "mod.just")
    .args(["foo", "bar"])
    .stdout("BAR\n")
    .run();
}

#[test]
fn shell_expanded_strings_do_not_conflict_with_dependencies() {
  Test::new()
    .justfile(
      "
        foo a b:
          @echo {{a}}{{b}}
        bar a b: (foo a 'c')
      ",
    )
    .args(["bar", "A", "B"])
    .stdout("Ac\n")
    .run();

  Test::new()
    .justfile(
      "
        foo a b:
          @echo {{a}}{{b}}
        bar a b: (foo a'c')
      ",
    )
    .args(["bar", "A", "B"])
    .stdout("Ac\n")
    .run();

  Test::new()
    .justfile(
      "
        foo a b:
          @echo {{a}}{{b}}
        bar x b: (foo x 'c')
      ",
    )
    .args(["bar", "A", "B"])
    .stdout("Ac\n")
    .run();
}
