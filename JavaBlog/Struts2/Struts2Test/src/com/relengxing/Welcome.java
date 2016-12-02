package com.relengxing;

import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by relengxing on 2016/11/30.
 */
public class Welcome extends ActionSupport {

    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }
}
