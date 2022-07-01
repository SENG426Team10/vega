package com.uvic.venus.model;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name="secrets")
public class SecretInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String secretname;
    private String createddate;
    private String secretdata;


    public SecretInfo(String username, String secretName, String createdDate, String secretData) {
        this.username = username;
        this.secretname = secretName;
        this.createddate = createdDate;
        this.secretdata = secretData;
    }

    public SecretInfo() {

    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getSecretName() {
        return secretname;
    }

    public void setSecretName(String secretName) {
        this.secretname = secretName;
    }

    public String getCreatedDate() {
        return createddate;
    }

    public void setCreatedDate(String createdDate) {
        this.createddate = createdDate;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username;  }

    public String getSecretData() { return secretdata; }

    public void setSecretData(String secretData) { this.secretdata = secretData; }

    @Override
    public String toString() {
        return "SecretInfo{" +
                "username='" + username + '\'' +
                ", secretname='" + secretname + '\'' +
                ", createddate='" + createddate + '\'' +
                ", secretdata='" + secretdata + '\'' +
                '}';
    }

}
