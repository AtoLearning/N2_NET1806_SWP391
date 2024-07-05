package com.fuswap.dtos.response;

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
