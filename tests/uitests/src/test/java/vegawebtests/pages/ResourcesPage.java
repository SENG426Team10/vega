package vegawebtests.pages;
import java.io.File;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ResourcesPage extends Page {

    @FindBy(xpath = "//ul/li/a")
    public List<WebElement> fileLinks;
    
    @FindBy(xpath = "//input[@type='file']")
    public WebElement resourceUploadElement;

    @FindBy(xpath = "//button[@type='submit']")
    public WebElement submitButtonElement;
    
    public ResourcesPage(WebDriver webDriver) {
        super(webDriver);
    }

    public void submitFile(String path) {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(resourceUploadElement));
        resourceUploadElement.sendKeys(new File(path).getAbsolutePath());
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(submitButtonElement));
        submitButtonElement.click();
    }

    public WebElement getFileLinkByName(String filename) {
        return driver.findElement(By.xpath(String.format("//ul/li/a[text()=%s]", filename)));
    }
}
