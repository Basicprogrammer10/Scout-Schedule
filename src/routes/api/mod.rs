use afire::Server;

mod get_schedule;
mod post_admin;

pub fn add_routes(server: &mut Server) {
    get_schedule::add_route(server);
    post_admin::add_route(server);
}
