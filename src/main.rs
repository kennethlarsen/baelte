use clap::{clap_app};
use baelte::new::{generate_new_application, generate_files};
fn main() {
    let matches = clap_app!(myapp =>
        (version: env!("CARGO_PKG_VERSION"))
        (author: "Kenneth Larsen <hello@kennethlarsen.org>")
        (about: "CLI tool for Svelte")
        (@subcommand new =>
            (about: "scaffolds a new Svelte application")
            (@arg name: +required "The name of your application")
        )
        (@subcommand generate =>
            (about: "generates a file based on a blueprint")
            (@arg blueprint: +required "Type of blueprint, e.g. component")
            (@arg name: +required "The name of the file")
        )
    ).get_matches();

    if let Some(matches) = matches.subcommand_matches("new") {
        if matches.is_present("name") {
            let name = matches.value_of("name").unwrap();
            generate_new_application(name);
        } else {
            println!("Error");
        }
    }

    if let Some(matches) = matches.subcommand_matches("generate") {
        if matches.is_present("blueprint") && matches.is_present("name") {
            let blueprint = matches.value_of("blueprint").unwrap(); 
            let name = matches.value_of("name").unwrap();
            let capitalized_name = first_letter_to_uppper_case(name);

            generate_files(blueprint, name, capitalized_name);
        }
    }

    fn first_letter_to_uppper_case (s1: &str) -> String {
        let mut c = s1.chars();
        match c.next() {
            None => String::new(),
            Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
        }
    }
}