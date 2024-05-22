package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class PokeRestController {
	public static String baseUrl = "https://pokeapi.co/api/v2/";
	
	@GetMapping("/api/pokemon/{id}")
	public Pokemon getPoke(@PathVariable("id") int id) {
        try {
        	//自分で定義したgetRequestにAPIリクエストの処理を外注
        	JsonNode jsonNode = getRequest(baseUrl + "pokemon/" + id);
        	//英語の名前をJSONから取得
        	String pokeName = jsonNode.get("forms").get(0).get("name").asText();
        	//日本語に変換
        	String pokeNameJa = japanize(pokeName);
        	System.out.println("名前： " + pokeNameJa);
        	
        	//タイプを取得
        	JsonNode typeNode = jsonNode.get("types");
        	System.out.println("タイプ");
        	//タイプの日本語への変換はreact側で行う
        	List<String> typeList = new ArrayList<>();
        	for (int i=0;i<typeNode.size();i++) {
        		typeList.add(typeNode.get(i).get("type").get("name").asText());
        	}
        	
        	//画像URLを取得
        	String imgUrl = jsonNode.get("sprites").get("front_default").asText();
        	System.out.println(imgUrl);
        	
        	//図鑑説明を取得
        	JsonNode descs = getRequest(baseUrl + "pokemon-species/" + id);
        	String descJa = "";
        	for (JsonNode desc :descs.get("flavor_text_entries")) {
        		if ("ja".equals(desc.get("language").get("name").asText())) {
        			descJa = desc.get("flavor_text").asText();
        			break;
        		}
        	}
        	System.out.println(descJa);
        	
        	Pokemon pokemon = new Pokemon(id,pokeNameJa,typeList,descJa,imgUrl);
        	System.out.println(pokemon);
        	return pokemon;
        } catch (JsonProcessingException e) {
			e.printStackTrace();
        	return null;
		} catch (RestClientException e) {
			System.out.println("APIリクエストが失敗しました: " + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}
	
	public JsonNode getRequest(String url) throws RestClientException,JsonProcessingException{
		RestTemplate restTemplate = new RestTemplate();

        // GETリクエストを送信
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                String.class
        );

        // レスポンスを取得し、コンソールに出力
        String responseBody = responseEntity.getBody();
        
        ObjectMapper mapper = new ObjectMapper();
    	JsonNode jsonNode = mapper.readTree(responseBody);
    	
    	return jsonNode;
	}
	
	public String japanize(String name) {
		try {
			JsonNode jsonNode = getRequest("https://pokeapi.co/api/v2/pokemon-species/" + name);
			
			for (JsonNode obj : jsonNode.get("names")) {
				String nameJa = obj.get("name").asText();
				if ("ja-Hrkt".equals(obj.get("language").get("name").asText())) {
					if (nameJa != null) return obj.get("name").asText();
				}
				if ("ja".equals(obj.get("language").get("name").asText())) {
					if (nameJa != null) return obj.get("name").asText();
				}
			}
			
			return "？？？";
		} catch (RestClientException e) {
			System.out.println("APIリクエストが失敗しました: " + e.getMessage());
			e.printStackTrace();
			return null;
		} catch (JsonProcessingException e) {
        	e.printStackTrace();
        	return null;
        }
	}
}
