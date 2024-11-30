use super::*;

#[derive(Debug, Clone)]
pub(crate) struct Set<'src> {
  pub(crate) name: Name<'src>,
  pub(crate) value: Setting<'src>,
}

impl<'src> Keyed<'src> for Set<'src> {
  fn key(&self) -> &'src str {
    self.name.lexeme()
  }
}

impl Display for Set<'_> {
  fn fmt(&self, f: &mut Formatter) -> fmt::Result {
    write!(f, "set {} := {}", self.name, self.value)
  }
}
