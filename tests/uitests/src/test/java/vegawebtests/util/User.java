package vegawebtests.util;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;

public class User {
    private WebElement user;

    public User(WebElement user){
        this.user = user;
    }

    public String getFirstName(){
        return user.findElement(By.xpath("./td[1]")).getText();
    }

    public String getLastName(){
        return user.findElement(By.xpath("./td[2]")).getText();
    }

    public String getUsername(){
        return user.findElement(By.xpath("./td[3]")).getText();
    }

    public void enableUser(WebDriver driver){
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(user.findElement(By.xpath("./td[4]/a"))));
        user.findElement(By.xpath("./td[4]/a")).click();
    }

    // Possible values STAFF or USER
    public void changeRole(String role, WebDriver driver){
        Select roleSelect = new Select(user.findElement(By.xpath("./td[5]/select")));
        roleSelect.selectByValue(String.format("ROLE_%s", role));
    }
}
