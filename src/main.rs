use simple_config_parser::Config;

mod common;
mod event;
mod routes;
mod serve_static;

pub static mut ACTIVE: u32 = 0;
pub static mut ADMIN_PASS: Option<String> = None;

fn main() {
    let cfg = Config::new().file("data/config.cfg").unwrap();

    let ip = cfg.get_str("ip").unwrap();
    let port = cfg.get::<u16>("port").unwrap();
    let pass = cfg.get_str("password_hash").unwrap();
    unsafe { ADMIN_PASS = Some(pass) };

    println!("[*] Starting Server ({}:{})", ip, port);

    let mut server = afire::Server::new(&ip, port);

    serve_static::add_route(&mut server);
    routes::add_routes(&mut server);
    afire::Logger::new().attach(&mut server);

    server.start().unwrap();
}
