package com.fuswap.dtos.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleDto {
    Integer roleID;
    String roleName;

    @Override
    public String toString() {
        return "RoleDto{" +
                "RoleID=" + roleID +
                ", RoleName='" + roleName + '\'' +
                '}';
    }
}
