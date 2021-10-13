use afire::Server;

mod get_schedule;

pub fn add_routes(server: &mut Server) {
    get_schedule::add_route(server);
}
