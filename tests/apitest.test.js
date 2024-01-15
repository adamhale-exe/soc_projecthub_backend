// Import test + expect from vitest
import { test, expect } from "vitest";
// Import supertest from supertest
import supertest from "supertest";
import app from "../app.js";
// Import relevant functions and data (reset db, pool etc.)
import { resetProjectTables } from "../db/helpers.js";
import { pool } from "../db/index.js";
import { seedData } from "../db/seedData.js";

// TEST PLAN:
// call test - give it a specific name
// check it passes as an empty test

// ARRANGE:
// call reset db

// ACT:
// call `supertest` and pass in the Express app as an argument
// send a GET request to the /api/health endpoint
// await the overall expression and assign it to a `supertest` constant

// ASSERT:
// check GET/POST/PATCH/DELETE is working for individual test
// check response.status
// check response.headers
// check response.body

// Test 1: Getting all projects (GET)
// Endpoint: GET /projects
// Response body: { success: true, payload: an array of project objects }
// Response status: 200
// Response header: `Content-Type` header should contain `application/json`

// TEST PLAN:
// call test - give it a specific name
// check it passes as an empty test
test("get all projects", async function () {
	// ARRANGE:
	// call reset db
	try {
		const insertedRows = await resetProjectTables(seedData);
		console.log("Reset project table", insertedRows);
	} catch (e) {
		console.error(e);
		console.error("Failed to reset tables");
	}
	// ACT:
	// call `supertest` and pass in the Express app as an argument
	// send a GET request to the /projects endpoint
	// await the overall expression and assign it to a `supertest` constant
	const response = await supertest(app).get("/projects");
	// ASSERT:
	// check GET/POST/PATCH/DELETE is working for individual test
	// check response.status
	expect(response.status).toBe(200);
	// check response.headers
	expect(response.headers["content-type"]).toContain("application/json");
	// check response.body
	expect(typeof response.body).toBe("object");
});

// Test 2: Creating a project (POST)
// Endpoint: POST /projects
// Request body: { name: string, short_description: string,  long_description: string, language: string, difficulty: string, url: string}
// Response body: { success: true, payload: newly created project object }
// Response status: 201
// Response header: `Content-Type` header should contain `application/json`

// TEST PLAN:
// call test - give it a specific name
// check it passes as an empty test

test("create new project", async () => {
	try {
		const insertedRows = await resetProjectTables(seedData);
		console.log("Reset project table", insertedRows);
	} catch (e) {
		console.error(e);
		console.error("Failed to reset tables");
	}
	// ARRANGE:
	// Prepare the request body for creating a new project
	const projectData = {
		name: "User Login Field Invalidation",
		short_description: "Destroy a login screen for your website.",
		long_description:
			"Destroy a login screen for your website. This is a simple project that will allow you to remove functionality to your webpage!",
		language: "HTML",
		difficulty: "Medium",
		url: "https://codepen.io/diegoleme/pen/qBpyvr",
	};
	// ACT:
	// Send a POST request to the /projects endpoint with the projectData
	const response = await supertest(app)
		.post("/projects")
		.send(projectData)
		.set("Content-Type", "application/json");
	// ASSERT:
	// Check the response status code
	expect(response.body.status).toBe("success");
	expect(Array.isArray(response.body.data)).toBe(true);
	expect(response.body.data.length).toBe(1);

	const responseData = response.body.data[0];
	expect(responseData.id).toBe(11);
	expect(responseData.name).toBe("User Login Field Invalidation");
	expect(responseData.short_description).toBe(
		"Destroy a login screen for your website."
	);
	expect(responseData.long_description).toBe(
		"Destroy a login screen for your website. This is a simple project that will allow you to remove functionality to your webpage!"
	);
	expect(responseData.difficulty).toBe("Medium");
	expect(responseData.language).toBe("HTML");
	expect(responseData.url).toBe("https://codepen.io/diegoleme/pen/qBpyvr");
	expect(responseData.topic).toBe(null);
});

// Test 3: Deleting a project (DELETE)
// Endpoint: DELETE /projects/some_id
// Response body: { success: true, payload: deleted project object }
// Response status: 200
// Response header: `Content-Type` header should contain `application/json`

test("delete a project", async function () {
	// ARRANGE:
	// reset database
	try {
		const insertedRows = await resetProjectTables(seedData);
		console.log("Reset project table", insertedRows);
	} catch (e) {
		console.error(e);
		console.error("Failed to reset tables");
	}

	// Prepare the data: create a new project to delete
	const projectData = {
		name: "User Login Field Invalidation",
		short_description: "Destroy a login screen for your website.",
		long_description:
			"Destroy a login screen for your website. This is a simple project that will allow you to remove functionality to your webpage!",
		language: "HTML",
		difficulty: "Medium",
		url: "https://codepen.io/diegoleme/pen/qBpyvr",
	};

	const response = await supertest(app)
		.post("/projects")
		.send(projectData)
		.set("Content-Type", "application/json");

	// ASSERT:
	// Check the response status code
	expect(response.status).toBe(201); // Assuming 201 is the status code for resource created
	expect(response.body.status).toBe("success");
	expect(Array.isArray(response.body.data)).toBe(true);

	const responseData = response.body.data[0];
	expect(responseData.id).toBe(11);
	expect(responseData.name).toBe("User Login Field Invalidation");

	// Send a DELETE request to the endpoint for the created project
	const deleteResponse = await supertest(app)
		.delete(`/projects/${responseData.id}`)
		.set("Content-Type", "application/json");

	// ASSERT:
	// Check the response status code
	expect(deleteResponse.status).toBe(200);
	// Check the Content-Type header
	expect(deleteResponse.headers["content-type"]).toContain("application/json");

	// Check the response body structure
	expect(deleteResponse.body).toEqual({
		status: "success",
		data: expect.arrayContaining([
			expect.objectContaining({
				id: responseData.id,
				name: "User Login Field Invalidation",
				// We can add other expected properties here if necessary
			}),
		]),
	});
});

// Test 4: Getting all difficult projects (GET)
// Endpoint: GET /projects
// Response body: { success: true, payload: an array of project objects }
// Response status: 200
// Response header: `Content-Type` header should contain `application/json`

// TEST PLAN:
// call test - give it a specific name
// check it passes as an empty test
test("get difficult projects", async function () {
	// ARRANGE:
	test("get difficult projects", async function () {
		// ARRANGE:
		// Call reset db
		try {
			const insertedRows = await resetProjectTables(seedData);
			console.log("Reset project table", insertedRows);
		} catch (e) {
			console.error(e);
			console.error("Failed to reset tables");
		}

		// ACT:
		// Call `supertest` and pass in the Express app as an argument
		// Send a GET request to the /projects endpoint
		// Await the overall expression and assign it to a `response` constant
		const response = await supertest(app).get("/projects");

		// ASSERT:
		// Check GET request is working for individual test
		// Check response.status
		expect(response.status).toBe(200);
		// Check response.headers
		expect(response.headers["content-type"]).toContain("application/json");

		// Check if response.body is an array, fail the test if not
		expect(Array.isArray(response.body)).toBe(
			true,
			"Response body is not an array"
		);

		// Filter projects with difficulty "Difficult"
		const difficultProjects = response.body.filter(
			(project) => project.difficulty === "Difficult"
		);

		// Check that all projects in the filtered response have difficulty set to "Difficult"
		expect(
			difficultProjects.every((project) => project.difficulty === "Difficult")
		).toBe(true, "Not all projects have difficulty 'Difficult'");
	});
});

// TEST PLAN:
// call test - give it a specific name
// check it passes as an empty test
test("get CSS projects", async function () {
	// ARRANGE:
	test("get CSS projects", async function () {
		// ARRANGE:
		// Call reset db
		try {
			const insertedRows = await resetProjectTables(seedData);
			console.log("Reset project table", insertedRows);
		} catch (e) {
			console.error(e);
			console.error("Failed to reset tables");
		}

		// ACT:
		// Call `supertest` and pass in the Express app as an argument
		// Send a GET request to the /projects endpoint
		// Await the overall expression and assign it to a `response` constant
		const response = await supertest(app).get("/projects");

		// ASSERT:
		// Check GET request is working for individual test
		// Check response.status
		expect(response.status).toBe(200);
		// Check response.headers
		expect(response.headers["content-type"]).toContain("application/json");

		// Check if response.body is an array, fail the test if not
		expect(Array.isArray(response.body)).toBe(
			true,
			"Response body is not an array"
		);

		// Filter projects with language "CSS"
		const cssProjects = response.body.filter(
			(project) => project.language === "CSS"
		);

		// Check that all projects in the filtered response have language set to "CSS"
		expect(cssProjects.every((project) => project.language === "CSS")).toBe(
			true,
			"Not all projects have use the language 'CSS'"
		);
	});
});
