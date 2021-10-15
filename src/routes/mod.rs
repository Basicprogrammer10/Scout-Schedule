use afire::Server;

mod api;

pub fn add_routes(server: &mut Server) {
    api::add_routes(server);
}
