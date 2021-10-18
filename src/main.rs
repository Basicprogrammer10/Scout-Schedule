use simple_config_parser::config::Config;

mod common;
mod event;
mod routes;
mod serve_static;

pub static mut ACTIVE: u32 = 0;
pub static mut ADMIN_PASS: Option<String> = None;

fn main() {
    let mut cfg = Config::new(Some("data/config.cfg"));
    cfg.read().ok().expect("Error reading the config file");

    let ip = cfg.get("ip").unwrap();
    let port = cfg.get("port").unwrap().parse::<u16>().unwrap();
    let pass = cfg.get("password_hash").unwrap();
    unsafe { ADMIN_PASS = Some(pass) };

    println!("[*] Starting Server ({}:{})", ip, port);

    let mut server = afire::Server::new(&ip, port);

    serve_static::add_route(&mut server);
    routes::add_routes(&mut server);
    afire::Logger::attach(
        &mut server,
        afire::Logger::new(afire::Level::Info, None, true),
    );

    server.start();
}
