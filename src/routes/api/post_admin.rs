use afire::Header;
use afire::Method;
use afire::Response;
use afire::Server;
use sha2::{Digest, Sha256};

use crate::common;
use crate::ACTIVE;
use crate::ADMIN_PASS;

pub fn add_route(server: &mut Server) {
    server.route(Method::POST, "/api/admin", |req| {
        let pass = match req.query.get("pass") {
            Some(p) => common::decode_url_chars(p.as_str()),
            None => {
                return Response::new()
                    .status(400)
                    .text("No Admin Password Supplied")
                    .header(Header::new("Content-Type", "text/plain"))
            }
        };

        let mut hasher = Sha256::new();
        hasher.update(pass.as_bytes());
        if &format!("{:x}", hasher.finalize()) != unsafe { ADMIN_PASS.as_ref().unwrap() } {
            return Response::new()
                .status(400)
                .text("Invalid Admin Password")
                .header(Header::new("Content-Type", "text/plain"));
        }

        let new_id = match req.query.get("id") {
            Some(i) => i,
            None => {
                return Response::new()
                    .status(400)
                    .text("No Id")
                    .header(Header::new("Content-Type", "text/plain"))
            }
        };

        let id = match new_id.parse::<u32>() {
            Ok(i) => i,
            Err(_) => {
                return Response::new()
                    .status(400)
                    .text("Invalid Id")
                    .header(Header::new("Content-Type", "text/plain"))
            }
        };

        unsafe {
            ACTIVE = id;
        }

        Response::new()
            .text(format!("Ok! [{}]", id))
            .header(Header::new("Content-Type", "text/plain"))
    })
}
