package vegawebtests.pages;

import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

import vegawebtests.util.User;



public class AdminPage extends Page {

  public AdminPage(WebDriver webDriver) {
    super(webDriver);
  }

  public User getUser(String username) {
    return new User(driver.findElement(By.xpath(String.format("//tr[td[text()='%s']]", username))));
  }
}
