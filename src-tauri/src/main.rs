#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use rand::{distributions::Alphanumeric, Rng};
use tauri::{CustomMenuItem, Manager, Menu, Submenu, WindowBuilder, WindowMenuEvent, Wry};

pub fn handler(event: WindowMenuEvent<Wry>) {
    tauri::async_runtime::block_on(async move {
        match event.menu_item_id() {
            "open_new_window" => {
                let app = event.window().app_handle();
                let position = event.window().inner_position().unwrap();
                let x = (position.x + 10) as f64;
                let y = (position.y + 10) as f64;
                let _ = create_new_window(&app, x, y).await;
            }
            _ => {}
        }
    });
}

#[tauri::command]
async fn create_new_window(
    app: &tauri::AppHandle,
    x: f64,
    y: f64,
) -> Result<(), Box<dyn std::error::Error>> {
    let rand_string: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(10)
        .map(|c| c as char)
        .collect();
    let html_path = "/login";
    let _local_window = WindowBuilder::new(
        app,
        rand_string.clone(),
        tauri::WindowUrl::App(html_path.into()),
    )
    .title("")
    .inner_size(1440.0, 900.0)
    .min_inner_size(1072.0, 844.0)
    .position(x, y)
    .build()?;

    Ok(())
}

fn main() {
    let context = tauri::generate_context!();
    let _ = fix_path_env::fix();
    let open_new_window = CustomMenuItem::new("open_new_window".to_string(), "Open New Window");
    let submenu = Submenu::new("Utils", Menu::new().add_item(open_new_window));
    let menu = tauri::Menu::os_default(&context.package_info().name).add_submenu(submenu);
    #[cfg(target_os = "macos")]
    {
        tauri::Builder::default()
            .on_page_load(|window, _payload| {
                let label = window.label().to_string();
                window.listen("clicked".to_string(), move |_payload| {
                    println!("got 'clicked' event on window '{label}'");
                });
            })
            .menu(menu)
            .on_menu_event(|event| handler(event))
            .run(context)
            .expect("error while running tauri application");
    }
    #[cfg(target_os = "windows")]
    {
        tauri::Builder::default()
            .on_page_load(|window, _payload| {
                let label = window.label().to_string();
                window.listen("clicked".to_string(), move |_payload| {
                    println!("got 'clicked' event on window '{label}'");
                });
            })
            .run(context)
            .expect("error while running tauri application");
    }
}
