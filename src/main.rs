mod event;
mod routes;
mod serve_static;

pub static mut ACTIVE: u32 = 0;

fn main() {
    // TODO: Read from Config
    let ip = "0.0.0.0";
    let port = 8080;

    println!("[*] Starting Server ({}:{})", ip, port);

    let mut server = afire::Server::new(ip, port);

    serve_static::add_route(&mut server);
    routes::add_routes(&mut server);
    afire::Logger::attach(
        &mut server,
        afire::Logger::new(afire::Level::Info, None, true),
    );

    server.start();
}
