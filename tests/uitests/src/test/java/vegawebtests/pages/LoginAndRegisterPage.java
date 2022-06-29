package vegawebtests.pages;

import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

/**
 * Sample page
 */
public class LoginAndRegisterPage extends Page {
  
  @FindBy(xpath = "//a[@class='nav-link']")
  public List<WebElement> allLinks;

  public LoginAndRegisterPage(WebDriver webDriver) {
    super(webDriver);
  }
}
