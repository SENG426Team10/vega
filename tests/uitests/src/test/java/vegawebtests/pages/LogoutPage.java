package vegawebtests.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LogoutPage extends Page {
        
    @FindBy(xpath = "//button[text()='signout']")
    public WebElement signoutElement;

    public LogoutPage(WebDriver webDriver) {
        super(webDriver);
    }
}
