use sha2::{Digest, Sha256};

use crate::common;
use crate::ACTIVE;
use crate::ADMIN_PASS;

pub fn add_route(server: &mut afire::Server) {
    server.route(afire::Method::POST, "/api/admin", |req| {
        let pass = match req.query.get("pass") {
            Some(p) => common::decode_url_chars(p.as_str()),
            None => {
                return afire::Response::new(
                    400,
                    "No Admin Password Supplied",
                    vec![afire::Header::new("Content-Type", "text/plain")],
                )
            }
        };

        let mut hasher = Sha256::new();
        hasher.update(pass.as_bytes());
        if &format!("{:x}", hasher.finalize()) != unsafe { ADMIN_PASS.as_ref().unwrap() } {
            return afire::Response::new(
                400,
                "Invalid Admin Password",
                vec![afire::Header::new("Content-Type", "text/plain")],
            );
        }

        let new_id = match req.query.get("id") {
            Some(i) => i,
            None => {
                return afire::Response::new(
                    400,
                    "No Id",
                    vec![afire::Header::new("Content-Type", "text/plain")],
                );
            }
        };

        let id = match new_id.parse::<u32>() {
            Ok(i) => i,
            Err(_) => {
                return afire::Response::new(
                    400,
                    "Invalid
                     Id",
                    vec![afire::Header::new("Content-Type", "text/plain")],
                );
            }
        };

        unsafe {
            ACTIVE = id;
        }

        afire::Response::new(
            200,
            &format!("Ok! [{}]", id),
            vec![afire::Header::new("Content-Type", "text/plain")],
        )
    })
}
