# Hatch Engineering Technical Test 🛠

## Purpose

This is Fred's submission to the Hatch Engineering technical test. The purpose of this task is to give a sense of my technical ability and how I work with tools that are similar to what Hatch uses.

## The Problem

At Hatch, we need often need to make decisions based on the structure of one of our company's organisational chart. This could be things such as making sure people in certain teams only have access to information they're allowed to see, or notifying the correct people in the hierarchy about the status of roles in teams they oversee.

As an example, an organisational chart for a given organisation might look something like this:

![Org Chart](https://qualityinspection.org/wp-content/uploads/2014/04/Screen-Shot-2014-05-05-at-10.57.09-am-e1399258713233.png "Org Chart")

The problem we have is that within our product, a user needs to be able to input where they or another entity sits within their company's hierarchy. We also need to be able to figure out what users or jobs are a part of a given hierarchy.

Also, no two companies are the same when it comes to structure. Some companies call the first tier of their org chart divisions, some call them areas etc, some have 2 levels of hierarchy some have 5, so we need to be flexible in allowing for multiple structures.

A user can only be in the bottom level of the org chart i.e. they can be in Quality Control but not in Quality.

## The Task

In order to solve this problem, we'd like you to do a few things:

1. Create a **mock** API client that returns a organisations hierarchy like that defined in the section above. (returning static data is fine. Do not build a server, spend the time making the submission represent your view of production quality code, it would be later be replaced by a real remote call).
   - Your structure should scale from the smallest start-up, all the way to the world's largest organisations.
2. Build a React Component that we could add to a settings form which would allow a user to select which division they are part of within the companies hierarchy.
   - The component doesn't need to save the information externally, but it should pass out the selected level as it would be stored on an entity like a User.
   - The component should be usable with multiple entities such as a User, Job or piece of equipment.
   - The component should also accept a level in the hierarchy and render itself accordingly.
   - Host the component it a test page so we can interact with it.
3. Provide a method somewhere in your code that given a level in the hierarchy and a list of entities such as a user, it finds all passed entities at or below that level.
   - Create an example entity for a User that contains where in the hierarchy they sit.
4. Make sure that your code is unit tested.
5. Briefly describe how you would persist the Organisational Structure for each company in Postgres, and how you would persist where an entity like a User, a piece of Inventory or a Job sits in the hierarchy.
   - How would you implement a query to perform #3 with this structure?

Don't worry if you feel as though some of this task is vague, it's been written that way intentionally so that you have the freedom to approach the task however you want.

Fork this project to a private repository (GitHub won't let you fork if you can't create private repo's, use bitbucket in this case), or start from scratch if you prefer and create a working React app that solves the problem as described above.

### Tips

- **We expect the submission to represent your view of production code.**
- We are more concerned with UX than UI.
- Commit regularly.

## Solution

To represent the variable hierarchy with clearly defined users, I chose to implement a structure where the "Division" of the company can have a parent which is also a Division, and "Team"s can belong inside Divisions. `Team`s represent the "leaf node", so Users, Jobs or Inventory items can all have `Team` as a parent, but they cannot have `Division` as a parent.

To implement the mock API, I'm using JSON with a wrapper function providing hooks which can easily be replaced by API calls. I provide at least one example of each entity type.

I'm using a recursive renderer, so the organisation structure can be any size or complexity. The component lets the user click through to divisions to narrow down the tree, or select a level to only show nodes at or below that level. If an entity (user, job or inventory item) has been selected, the renderer shows where in the hierarchy that entity currently sits. If an entity is selected and then a `Team` node is clicked, an alert message is used to indicate that this is where the update operation would be called, though it does not currently implement one.
