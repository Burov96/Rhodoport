# First kill absolutely everything
pkill -SIGTERM mariadbd
pkill -SIGTERM mysqld
pkill -f "mariadbd-safe"
pkill -f "mysqld_safe"
pkill -f "ssh -R"
pkill -f autossh
sleep 5

# Force kill any remaining processes
pkill -SIGKILL mariadbd
pkill -SIGKILL mysqld
pkill -SIGKILL -f "mariadbd-safe"
pkill -SIGKILL -f "mysqld_safe"
sleep 5

# Clean up all potential PID files
rm -f /data/data/com.termux/files/usr/var/lib/mysql/*.pid
rm -f /data/data/com.termux/files/usr/var/lib/mysql/localhost.err

# Start MariaDB without grant tables
mariadbd-safe --skip-grant-tables --skip-networking &
sleep 15

# Reset root password and privileges
mariadb -e "
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mangasarkon';
FLUSH PRIVILEGES;"
sleep 5

# Kill MariaDB and restart normally
pkill -SIGTERM mariadbd
sleep 5

# Start fresh
mariadbd-safe &
sleep 15

# Now set up root permissions for remote access
mariadb -u root -p'mangasarkon' -e "
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'mangasarkon' WITH GRANT OPTION;
FLUSH PRIVILEGES;"
sleep 5

# Start SSH tunnel without -N flag to see output
autossh -M 0 -o "ServerAliveInterval 60" -o "ServerAliveCountMax 3" -R 33516:localhost:3306 serveo.net
