package com.uvic.venus.controller;

import com.uvic.venus.model.SecretInfo;
import com.uvic.venus.repository.SecretInfoDAO;
import com.uvic.venus.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Example;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vault")
public class VaultController {

    @Autowired
    SecretInfoDAO secretInfoDAO;

    @Autowired
    DataSource dataSource;

    @Autowired
    StorageService storageService;

    @RequestMapping(value = "/getallsecrets", method = RequestMethod.GET)
    public ResponseEntity<?> getAllSecrets(){
        List<SecretInfo> secretInfoList = secretInfoDAO.findAll();
        return ResponseEntity.ok(secretInfoList);
    }

    @GetMapping(value = "/getusersecrets")
    @ResponseBody
    public ResponseEntity<?> getUserSecrets(@RequestParam("username") String username){
        SecretInfo probe = new SecretInfo( username, null, null, null);
        List<SecretInfo> secretInfoList = secretInfoDAO.findAll(Example.of(probe));
        return ResponseEntity.ok(secretInfoList);
    }

    @PostMapping(value = "/uploadsecret")
    public ResponseEntity<?> uploadSecret(@RequestBody SecretInfo secret){
        secretInfoDAO.save(secret);
        return ResponseEntity.ok("Secret Saved Successfully");
    }

    @PostMapping(value = "/deletesecret")
    public ResponseEntity<?> deleteSecret(@RequestBody SecretInfo secret){
        System.out.println("Imma delete dis");
        secretInfoDAO.delete(secret);
        return ResponseEntity.ok("Secret Deleted Successfully");
    }
}
