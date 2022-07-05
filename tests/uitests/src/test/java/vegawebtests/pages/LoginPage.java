package vegawebtests.pages;
import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage extends Page {

    @FindBy(xpath = "//label[text()='USERNAME']/../input")
    public WebElement usernameEntryElement;
    
    @FindBy(xpath = "//label[text()='PASSWORD']/../input")
    public WebElement passwordEntryElement;
    
    @FindBy(xpath = "//label[text()='FIRST NAME']/../input")
    public WebElement fnameEntryElement;
    
    @FindBy(xpath = "//label[text()='LAST NAME']/../input")
    public WebElement lnameEntryElement;
    
    @FindBy(xpath = "//form/button[1]")
    public WebElement submitElement;
    
    @FindBy(xpath = "//form/button[2]")
    public WebElement switchModeElement;
    
    @FindBy(xpath = "//p[@class='feedback-msg']")
    public WebElement feedbackElement;

    public LoginPage(WebDriver webDriver) {
        super(webDriver);
    }

    public void switchMode() {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(switchModeElement));
    
        switchModeElement.click();
    }

    public void createAccount(String username, String fname, String lname, String password) {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(fnameEntryElement));
    
        usernameEntryElement.sendKeys(username);
        fnameEntryElement.sendKeys(fname);
        lnameEntryElement.sendKeys(lname);
        passwordEntryElement.sendKeys(password);
    
        submitElement.click();
    }

    public void login(String username, String password) {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(usernameEntryElement));
    
        usernameEntryElement.sendKeys(username);
        passwordEntryElement.sendKeys(password);
    
        submitElement.click();
    }
}