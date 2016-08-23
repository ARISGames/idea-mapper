.PHONY: deploy-beta

deploy-beta:
	rsync -vrc * root@morpheus.arisgames.org:/var/www/html/scratch/idea-mapper --exclude-from rsync-exclude
