function setup( ) {
	'use strict';
	window.removeEventListener( 'load', setup );
	
	var model = {
	messages: [
		{
			label: '%{action} %{subject}\u2026',
			popularity: 50,
			sub: 'submessages',
			minSubCount: 0,
			maxSubCount: 10,
			minDelay: 10,
			maxDelay: 1500
		},
		{
			label: 'Creating restore point\u2026',
			popularity: 5,
			minSubCount: 20,
			maxSubCount: 100,
			minDelay: 0,
			maxDelay: 0,
			sub: [
				'%{hex} : %{hex} %{hex} %{hex} %{hex} %{hex} %{hex} %{hex} %{hex}',
				'%{hex} : %{hex} %{hex} %{hex} %{hex} %{hex} %{hex} %{hex} %{hex}+'
			]
		},
		{
			label: 'Downloading %{subject}\u2026',
			popularity: 10,
			minDelay: 200,
			maxDelay: 20000,
			step: function( e, t ) {
				var p = e / t, l = 70, i, v = '';
				for( i = 0; i < p * l; ++ i ) {
					v += '=';
				}
				for( ; i < l; ++ i ) {
					v += ' ';
				}
				return '[' + v + '] ' + (p * 100).toFixed( 1 ) + '%';
			}
		},
		{
			label: 'Profiling\u2026',
			popularity: 1,
			sub: 'profiles',
			minSubCount: 3,
			maxSubCount: 30
		},
		{
			label: 'Profiling\u2026',
			popularity: 2,
			sub: 'profiles',
			minSubCount: 50,
			maxSubCount: 200,
			minDelay: 10,
			maxDelay: 50
		},
		{
			label: 'Restarting\u2026\nSystem is shutting down NOW',
			popularity: 0.3,
			sub: [{
				label: '\n\nConnection lost',
				minDelay: 6000,
				maxDelay: 6000,
				step: function( e, t ) {
					if( e >= t ) {
						return 'Reconnecting\u2026\n\n' +
						'=================\n' +
						'= WELCOME =======\n' +
						'=================\n\n';
					} else if( e >= t - 1000 ) {
						return 'Reconnecting\u2026';
					} else {
						return 'Reconnecting in ' + (((t - e) / 1000)|0) + 's';
					}
				}
			}],
			minSubCount: 1,
			maxSubCount: 1,
			minDelay: 1000,
			maxDelay: 3000
		}
	],
	actions: [
		'Detecting',
		'Uploading',
		'Updating',
		'Downgrading',
		'Committing',
		'Merging',
		'Reverting',
		'Compiling',
		'Decompiling',
		'Defragmenting',
		'Linking',
		'Verifying',
		'Compressing',
		'Uncompressing',
		'Integrating',
		'Translating',
		'Emulating',
		'Running',
		'Restarting',
		'Logging',
		'Distributing',
		'Redistributing',
		'Spawning',
		'Cleaning'
	],
	subjects: [
		'firmware',
		'kernel',
		'operating system',
		'window system',
		'package manager',
		'drivers',
		'browser',
		'server',
		'SSH',
		'encryption library',
		'matrix library',
		'everything',
		'database',
		'firewall',
		'load balancer',
		'antivirus',
		'checkdisk',
		'DNS',
		'router',
		'compiler',
		'linker',
		'virtual machine',
		'standard libraries',
		'neural network',
		'skynet',
		'core',
		'system',
		'cache',
		'definitions',
		'components',
		'hard disk',
		'RAM',
		'bookmarks'
	],
	submessages: [
		{
			label: '\t%{info}',
			popularity: 20
		},
		{
			label: '\tWarning: %{warning} (line %{int})',
			popularity: 4
		},
		{
			label: '\tError: %{error} [attempt 1: retrying]',
			popularity: 1
		}
	],
	profiles: [
		'%{hex} %{num}  [min %{num}, max %{num}] rating: %{num}'
	],
	types: [
		'object',
		'enum',
		'function',
		'interface',
		'cookie',
		'failsafe'
	],
	standards: [
		'RFC%{int}',
		'ISO%{int}',
		'HTTP1.0',
		'HTTP1.1',
		'standard %{hex}',
		'best practices',
		'%{hex}'
	],
	infos: [
		'scheduled downtime commencing',
		'nothing to update',
		'%{subject} clock updated',
		'%{subject} disconnected from %{subject}',
		'%{subject} is ready',
		'%{subject} has idle resources',
		'%{subject} requires restart',
		'%{subject} connected to %{subject} via %{subject}',
		'set environment variable',
		'lost the game',
		'cleared temp folder',
		'cycling resources',
		'unpacking',
		'stage %{hex} complete',
		'ready to rumble',
		'***%{int}',
		'waiting for %{subject}',
		'-1',
		'nothing to declare',
		'assuming sane build environment (press foot pedal for insane)',
		'skipping stage %{int}',
		'connecting to %{ip}',
		'registered on %{ip}',
		'%{subject} detected; ignoring',
		'%{subject} conflicts with %{subject}; using wrapper instead',
		'found %{subject} but no %{subject}; will emulate in software',
		'retrying stage %{int}',
		'awaiting timeout',
		'downloads folder full; clearing old data',
		'%{subject} is no-longer used and can be removed',
		'%{standard} updated to %{standard} (%{int})',
		'compliant to %{standard}',
		'bugs fixed: %{int}, %{int}, %{int}',
		'bugs fixed: %{int}, %{int}, %{int}, %{int}, %{int}, %{int}, %{int}, %{int}, %{int}',
		'locking resource',
		'blocking port %{int}',
		'opening port %{int}',
		'checking %{subject} for %{standard} compliance',
		'white-point adjustment will be required for full functionality',
		'%{subject} not found; skipping',
		'%{int}/%{int} : %{int}',
		'%{hex}'
	],
	warnings: [
		'%{type} %{hex} does not conform to %{standard}',
		'%{type} is deprecated',
		'last updated over 6 months ago',
		'the cake is a lie',
		'working around non-deterministic behaviour (see http://%{ip}/issue%{hex} for details)',
		'resource is locked on %{subject}',
		'%{ip} is unavailable; using %{ip} instead',
		'security layer temporarily disabled',
		'update to library (id %{hex}) will be required',
		'unrecognised command',
		'all nodes busy',
		'lost connection to %{ip}',
		'lost connection to %{subject}',
		'%{subject} is running slow',
		'%{subject} clock is inconsistent with %{subject}',
		'bad commandline arguments; ignoring',
		'using precompiled binaries',
		'PEBKAC issue detected',
		'timeout',
		'encountered %{hex} [%{int}] on %{hex}:%{hex}'
	],
	errors: [
		'%{subject} and %{subject} are unable to communicate',
		'%{type} %{hex} does not implement %{standard}',
		'%{type} %{hex} is immutable',
		'%{subject} is busy',
		'unable to load %{standard}',
		'Out Of Memory'
	]
	};
	
	function rnd( ) {
		return Math.random( );
	}
	
	var
	stack = [{choices:model.messages,n:Number.POSITIVE_INFINITY,minDelay:50,maxDelay:2000}],
	output = document.createElement( 'div' ),
	outProf = document.createElement( 'div' );
	output.id = 'hold';
	outProf.id = 'prof';
	document.body.appendChild( output );
	document.body.appendChild( outProf );
	
	function write( msg ) {
		var ln = document.createElement( 'div' );
		ln.textContent = msg;
		output.appendChild( ln );
		if( output.childNodes.length > 100 ) {
			output.removeChild( output.firstChild );
		}
		output.scrollTop = 9999999;
		return ln;
	}
	
	function pick( list, parent ) {
		var v = {}, i, e = list.length, tot = 0, choice;
		
		for( i = 0; i < e; ++ i ) {
			if( list[i].popularity !== undefined ) {
				tot += list[i].popularity;
			} else {
				++ tot;
			}
		}
		choice = Math.random( ) * tot;
		
		tot = 0;
		for( i = 0; i < e; ++ i ) {
			if( list[i].popularity !== undefined ) {
				tot += list[i].popularity;
			} else {
				++ tot;
			}
			if( tot > choice ) {
				if( list[i].label !== undefined ) {
					v = list[i];
				} else {
					v.label = list[i];
				}
				break;
			}
		}
		
		if( parent !== undefined ) {
			if( v.sub === undefined ) {
				v.minSubCount = 0;
				v.maxSubCount = 0;
			} else {
				if( v.minSubCount === undefined ) {
					v.minSubCount = 0;
				}
				if( v.maxSubCount === undefined ) {
					v.maxSubCount = 10;
				}
			}
			if( v.minDelay === undefined ) {
				v.minDelay = parent.minDelay;
				v.maxDelay = parent.maxDelay;
			} else if( v.maxDelay === undefined ) {
				v.maxDelay = v.minDelay;
			}
		}
		return v;
	}
	
	function complete( v ) {
		return v.replace( /%\{([^}]+)\}/g, function( a, b ) {
			if( b === 'num' ) {
				return Math.random( ).toFixed( 8 );
			}
			if( b === 'hex' ) {
				var h = ((Math.random( ) * 0x1000000)|0).toString( 16 ).toUpperCase( );
				return '000000'.substr( h.length ) + h;
			}
			if( b === 'int' ) {
				return ((Math.random( ) * 10000)|0).toString( 10 );
			}
			if( b === 'ip' ) {
				return ((Math.random( ) * 256)|0).toString( 10 ) +
					'.' + ((Math.random( ) * 256)|0).toString( 10 ) +
					'.' + ((Math.random( ) * 256)|0).toString( 10 ) +
					'.' + ((Math.random( ) * 256)|0).toString( 10 );
			}
			var l = model[b+'s'] || model[b];
			if( !l ) {
				return '?';
			}
			return complete( pick( l ).label );
		} );
	}
	
	function pad( v ) {
		v = '' + v;
		return '00'.substr( v.length ) + v;
	}
	
	function next( ) {
		var o = stack[stack.length-1];
		while( o.n === 0 ) {
			-- stack.length;
			o = stack[stack.length-1];
		}
		-- o.n;
		
		var c = pick( o.choices, o );
		
		write( complete( c.label ) );
		
		if( c.sub !== undefined && c.maxSubCount > 0 ) {
			stack.push( {
				choices: (typeof c.sub === 'string') ? model[c.sub] : c.sub,
				n: (c.minSubCount + rnd( ) * rnd( ) * (c.maxSubCount - c.minSubCount))|0,
				minDelay:c.minDelay,
				maxDelay:c.maxDelay
			} );
		}
		var tm = c.minDelay + rnd( ) * rnd( ) * rnd( ) * (c.maxDelay - c.minDelay);
		if( c.step !== undefined ) {
			var
			ln = write( c.step( 0, tm ) ),
			n = (new Date( )).getTime( ),
			tt = window.setInterval( function( ) {
				var n2 = (new Date( )).getTime( ) - n;
				if( n2 >= tm ) {
					n2 = tm;
					window.clearInterval( tt );
				}
				ln.textContent = c.step( n2, tm );
			}, 50 );
		}
		setTimeout( next, tm );
	}
	write( 'Preparing\u2026' );
	next( );
	
	var packets = (Math.random( ) * 10000)|0, packetloss = 0;
	function prof( ) {
		packets += (Math.random( ) * 1000)|0;
		packetloss += (Math.pow( Math.random( ), 5 ) * 5)|0;
		var tm = new Date( );
		outProf.textContent =
			'CPU:     ' + (Math.pow( Math.random( ), 16 ) * 200).toFixed( 1 ) + '%\t\n' +
			'threads: ' + ((Math.random( ) * 5 + 80)|0).toString( ) + '\t\n' +
			'status:  active\t\n' +
			'packets: ' + packets + '\t(lost: ' + packetloss + ')\t\n' +
			'server time: ' + pad( ((tm.getHours( ) + 1) % 24) ) + ':' + pad( tm.getMinutes( ) ) + '\t\n'
		;
	}
	setInterval( prof, 5000 );
	prof( );
}
window.addEventListener( 'load', setup );
