import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { useState } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function PasswordField({
  handlePassword,
  name = "password",
  isNew = false,
}) {
  const [isPasswordVisible, toggleIsPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    toggleIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      required
      name={name}
      label={capitalize(name)}
      type={isPasswordVisible ? "text" : "password"}
      id="password"
      autoComplete={isNew ? "new-password" : "current-password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <VpnKeyIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handlePassword}
    />
  );
}
