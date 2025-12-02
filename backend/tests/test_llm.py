from unittest.mock import patch

def test_llm_chat(client):
    # IMPORTANT: patch where the function is USED (main.py), not where it is defined
    with patch("main.get_llm_response") as mock_llm:
        mock_llm.return_value = "Hello from mocked AI"

        response = client.post("/llm/chat", json={
            "message": "Hello",
            "user_id": "test"
        })

        assert response.status_code == 200
        assert response.json()["reply"] == "Hello from mocked AI"
