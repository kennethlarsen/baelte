use fs_extra::dir::create;
use fs_extra::file::write_all;
use super::fixtures::{get_app_content, get_package_json, get_rollup, get_main, get_index_html, get_global_css, get_component_content, get_component_test, get_babel, get_jest};
use super::utils::{update_values_in_files};

pub fn generate_new_application(name: &str) {
  create(format!("{}/", name), false);
  create(format!("{}/src", name), false);
  create(format!("{}/src/ui", name), false);
  create(format!("{}/src/ui/components", name), false);

  create(format!("{}/public", name), false);

  write_all(format!("{}/src/App.svelte", name), get_app_content());
  write_all(format!("{}/src/main.js", name), get_main());

  write_all(format!("{}/public/index.html", name), get_index_html());
  write_all(format!("{}/public/global.css", name), get_global_css());
 
  let package_path = format!("{}/package.json", name).to_string();
  write_all(&package_path, get_package_json());
  update_values_in_files("{AppName}", name, &package_path);

  write_all(format!("{}/rollup.config.js", name), get_rollup());
  write_all(format!("{}/babel.config.js", name), get_babel());
  write_all(format!("{}/jest.config.js", name), get_jest());

 println!("✨ Generated project in /{}", name);
 println!("To get started, run `cd /{}` and run `yarn` to install dependencies and the `yarn run dev` to start the server.", name);

}

pub fn generate_files(blueprint: &str, name: &str, capitalized_name: String) {
  let test_path = format!("src/ui/components/{}/Component.spec.js", name).to_string();
  create(format!("src/ui/components/{}", name), false);

  write_all(format!("src/ui/components/{}/Component.svelte", name), get_component_content());
  write_all(&test_path, get_component_test());

  update_values_in_files("{ComponentName}", &capitalized_name, &test_path);

  println!("✨ Generated {} in src/ui/components/{}", blueprint, name);
  println!("🔬 Generated test in src/ui/components/{}", name);

}