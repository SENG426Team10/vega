package vegawebtests.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

/**
 * Abstract class representation of a Page in the UI. Page object pattern
 */
public abstract class Page {

  protected WebDriver driver;

  @FindBy(xpath = "//a[@class='nav-link']")
  public List<WebElement> allLinks;

  /*
   * Constructor injecting the WebDriver interface
   * 
   * @param webDriver
   */
  public Page(WebDriver driver) {
    this.driver = driver;
  }

  public String getTitle() {
    return driver.getTitle();
  }

  public void clickLink(String label) {
    WebElement link = driver.findElement(By.xpath(String.format("//a[@class='nav-link' and text()='%s']", label)));
    new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(link));
    link.click();
  }

}
