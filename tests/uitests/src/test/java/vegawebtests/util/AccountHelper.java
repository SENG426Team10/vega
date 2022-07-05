package vegawebtests.util;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import vegawebtests.pages.LoginPage;
import vegawebtests.pages.LogoutPage;

public class AccountHelper {
    private WebDriver driver;
    private JavascriptExecutor js;
    private String baseUrl;
    private LoginPage loginpage;
    private LogoutPage logoutpage;

    
    public AccountHelper(WebDriver driver, String baseUrl) {
        this.driver = driver;
        this.baseUrl = baseUrl;
        js = (JavascriptExecutor) driver;
        loginpage = PageFactory.initElements(driver, LoginPage.class);
        logoutpage = PageFactory.initElements(driver, LogoutPage.class);
    }

    public boolean signedIn() {
        String jwt = (String) js.executeScript("return window.localStorage.jwt");
        return (jwt != null && !(jwt).equals(""));
    }

    public String getRole() {
        // wait for page to load
        Wait.wait(500);
        return (String) js.executeScript("return window.localStorage.role");
    }

    public void login(String username, String password) {
        driver.get(baseUrl);
        if (!signedIn()){
            driver.get(String.format("%s/login", baseUrl));
            loginpage.login(username, password);
        }
    }

    public void logout(){
        if (signedIn()){
            driver.get(String.format("%s/account", baseUrl));
            new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(logoutpage.signoutElement));
            logoutpage.signoutElement.click();
        }
    }

    public void switchAccountTo(String username, String password) {
        logout();
        login(username, password);
    }


}
