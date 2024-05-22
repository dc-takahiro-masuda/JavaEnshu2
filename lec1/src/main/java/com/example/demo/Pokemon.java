package com.example.demo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pokemon {
	private int id;
	private String name;
	private List<String> type;
	private String desc;
	private String imgUrl;
}
