# What is this?

Live Website: https://comic-overflow.onrender.com/
Comic Overflow is a basic e-commerce web application.

- You can browse & purchase comic books with an account
  - Items can be purchased using the integrated Stripe API.
- Items are categorized, and there is a way to see items by category
- If you have an account you can see your order history
- If you have an account your current shopping cart can be seen on multiple devices
- Adding items to your cart as a guest is allowed, and if you make an account, the items are transfered over.
- An admin is a special type of user with the ability to create new items for the store

# Basic Features

- A user should be able to see products
- A logged in user should be able to
  - see the items in their cart
  - add a new product to their cart
  - remove an item from their cart
  - create an order
- A user should be able to see their orders
- A user should be able to create an account
- A user should be able to see their past orders
- A non-logged in user should be able to add to their cart and have those items added to their cart after authenticating
- A user should be able to review a product
- A user should be able to update their profile
- An administrator should be able to add a new product

## How to get set up:

1. Visit our live deployment at https://comic-overflow.onrender.com/
2. Run it locally by git cloning this repo and running the following commands in the terminal:

```
$ createdb grace_shopper_db
$ npm i
$ npm run seed:dev
#npm run start:dev
```

And you're all set to start shopping!

## Images relevant to project planning & devlopment

![Database schema version 6](excalidraws/schema6.png)
![A closer look at Cart item and order](excalidraws/cartitemOrder.png)
