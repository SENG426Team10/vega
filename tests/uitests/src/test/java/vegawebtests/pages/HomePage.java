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
public class HomePage extends Page {

  @FindBy(xpath = "//a[@class='nav-link']")
  public List<WebElement> allLinks;

  public HomePage(WebDriver webDriver) {
    super(webDriver);
  }
}
