package com.wondercars.store.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private JdbcTemplate jdbc;
    private NamedParameterJdbcTemplate npjdbc;

    @Autowired
    public UserRepository(JdbcTemplate jdbc, NamedParameterJdbcTemplate npjdbc) {
        this.jdbc = jdbc;
        this.npjdbc = npjdbc;
    }

    public List getUsers() {
        return jdbc.queryForList("SELECT * FROM USER");
    }
}
