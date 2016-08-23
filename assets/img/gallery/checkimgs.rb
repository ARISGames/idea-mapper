#!/usr/bin/env ruby

require 'json'

img_types = %w{
  Cause_effect_4B2_Bottom_Box
  Organizational_Chart_4C3
  Venn_Diagram_4F2_Circles
  Cause_effect_4B2_Top_Arrow
  Side_Panel_Images
  Venn_Diagram_4F3_Circles
  Cause_effect_4B3_Bottom_Box
  Textured
  Venn_Diagram_4F3_Circles_s2
  Cause_effect_4B3_Top_Arrow
  Timeline_Chart_2E5_2E6_2E7
  Organizational_Chart_4C2
  Topic_Chart
}

imgs = JSON.load(File.read('../../imagesGallery.json'))
imgs['categories'].each do |cat|
  cat['images'].each do |img|
    raise '!' unless img['category'] == cat['name']
    raise '!' unless img['thumb'] == "#{cat['name']}/Side_Panel_Images/#{img['image']}"
    img_types.each do |img_type|
      raise '!' unless Dir.entries("#{cat['name']}/#{img_type}").include?(img['image'])
    end
  end
end
