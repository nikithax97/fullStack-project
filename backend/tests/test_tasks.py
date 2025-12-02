def test_create_task(client):
    response = client.post("/tasks", json={
        "title": "Test Task",
        "completed": False
    })

    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["completed"] is False


def test_get_tasks(client):
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_task(client):
    # Create first
    create = client.post("/tasks", json={
        "title": "Old Task",
        "completed": False
    })
    task_id = create.json()["id"]

    update = client.put(f"/tasks/{task_id}", json={
        "title": "Updated Task",
        "completed": True
    })

    assert update.status_code == 200
    assert update.json()["title"] == "Updated Task"
    assert update.json()["completed"] is True


def test_delete_task(client):
    create = client.post("/tasks", json={
        "title": "Delete Me",
        "completed": False
    })
    task_id = create.json()["id"]

    delete = client.delete(f"/tasks/{task_id}")
    assert delete.status_code == 200
