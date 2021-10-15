use afire::Server;

mod get_active;
mod get_schedule;

pub fn add_routes(server: &mut Server) {
    get_active::add_route(server);
    get_schedule::add_route(server);
}
