// Following Pseudocode of this link: https://refactoring.guru/design-patterns/factory-method

// The creator class declares the factory method that must
// return an object of a product class. The creator's subclasses
// usually provide the implementation of this method.
abstract class Dialog 
{ // FACTORY

    // The creator may also provide some default implementation
    // of the factory method.
    public abstract createButton(): Button;

    // Note that, despite its name, the creator's primary
    // responsibility isn't creating products. It usually
    // contains some core business logic that relies on product
    // objects returned by the factory method. Subclasses can
    // indirectly change that business logic by overriding the
    // factory method and returning a different type of product
    // from it.
    public log(): string 
    {
        // Call the factory method to create a product object.
        const button =  this.createButton();
        // Now use the product.
        return `Dialog Creator: created button ${button.render()}`;
    }
}

// Concrete creators override the factory method to change the
// resulting product's type.
class WindowsDialog extends Dialog
{ // CONCRETE FACTORY
    public createButton(): Button 
    {
        return new WindowsButton();
    }
}

class WebDialog extends Dialog
{ // CONCRETE FACTORY
    public createButton(): Button 
    {
        return new WebButton();
    }
}

// The product interface declares the operations that all
// concrete products must implement.
interface Button 
{ // PRODUCT
    render(): string, 
    onClick(): void
}

// Concrete products provide various implementations of the
// product interface.
class WindowsButton implements Button
{ // CONCRETE PRODUCT
    render(): string 
    {
        return "Windows Button"
    }
    onClick(): void {}
}

class WebButton implements Button
{ // CONCRETE PRODUCT
    render(): string {
        return "Web Button"
    }
    onClick(): void {}
}

function client(dialog: Dialog)
{
    console.log(`Client: ${dialog.constructor.name}`);
    console.log(dialog.log());
}

//TESTING
console.log("Running...")
client(new WindowsDialog());
client(new WebDialog());