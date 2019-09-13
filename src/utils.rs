
use std::fs::File;
use std::io::{self, Read, Write};

pub fn update_values_in_files(word_to_replace: &str, new_word: &str, path: &String) -> Result<(), io::Error> {
  let mut src = File::open(&path)?;
  let mut data = String::new();
  src.read_to_string(&mut data)?;
  drop(src);  // Close the file early

  let new_data = data.replace(word_to_replace, new_word);
  let mut dst = File::create(&path)?;
  dst.write(new_data.as_bytes())?;

  Ok(())
}