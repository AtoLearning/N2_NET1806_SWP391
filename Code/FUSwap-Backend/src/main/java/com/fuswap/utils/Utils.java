package com.fuswap.utils;

public class Utils {
    public static boolean isFptEduEmail(String email) {
        String regex = "^[A-Za-z0-9._%+-]+@fpt\\.edu\\.vn$";
        return email.matches(regex);
    }
}
